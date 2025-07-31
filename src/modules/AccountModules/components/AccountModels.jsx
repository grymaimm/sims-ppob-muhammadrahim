import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { toast } from 'sonner';
import { Loader2, Pencil } from 'lucide-react';

import { Button } from '@/components/shadcnui/button';
import { Input } from '@/components/shadcnui/input';
import { Label } from '@/components/shadcnui/label';

import LogoutButton from '@/modules/AuthModules/components/LogoutButton';
import {
  fetchProfile,
  updateProfile,
  updateProfileImage,
} from '@/store/slices/userSlice';

export default function AccountModels() {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch profile on mount
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // Update local state when profile is fetched
  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        email: profile.email || '',
        image: null,
      });
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      const file = files?.[0];
      if (file) {
        setFormData((prev) => ({ ...prev, image: file }));
        setImagePreview(URL.createObjectURL(file));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditClick = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
    setImagePreview(null);
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        email: profile.email || '',
        image: null,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validasi file gambar
      if (formData.image) {
        const maxSize = 100 * 1024; // 100KB
        if (formData.image.size > maxSize) {
          toast('Ukuran gambar maksimal 100 KB');
          return;
        }

        await dispatch(updateProfileImage(formData.image));
      }

      const hasNameChanged =
        formData.first_name !== profile.first_name ||
        formData.last_name !== profile.last_name;

      if (hasNameChanged) {
        await dispatch(
          updateProfile({
            first_name: formData.first_name,
            last_name: formData.last_name,
          }),
        );
      }

      setIsEditing(false);
      toast('Profil berhasil diperbarui.');
    } catch (err) {
      console.error('Gagal menyimpan profil:', err);
      toast('Terjadi kesalahan saat menyimpan.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6 py-6'>
        {/* FOTO PROFIL */}
        <div className='mb-6 flex flex-col items-center gap-4'>
          <label
            htmlFor='image-upload'
            className={`group relative ${isEditing ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <Image
              src={
                imagePreview ||
                profile?.profile_image ||
                '/asset/Profile Photo.png'
              }
              alt='Profile'
              width={96}
              height={96}
              className='size-24 rounded-full border object-cover'
            />
            {isEditing && (
              <div className='absolute bottom-0 right-0 flex size-7 items-center justify-center rounded-full border bg-background'>
                <Pencil className='h-4 w-4' />
              </div>
            )}
            <input
              id='image-upload'
              type='file'
              accept='image/*'
              name='image'
              hidden
              disabled={!isEditing}
              onChange={handleInputChange}
            />
          </label>
          <h3 className='text-3xl font-semibold'>
            {loading
              ? 'Loading...'
              : `${profile?.first_name} ${profile?.last_name}`}
          </h3>
        </div>

        {/* FORM INPUT */}
        <FormField
          label='Nama Depan'
          name='first_name'
          value={formData.first_name}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        <FormField
          label='Nama Belakang'
          name='last_name'
          value={formData.last_name}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        <FormField
          label='Email'
          name='email'
          type='email'
          value={formData.email}
          disabled
        />

        {/* BUTTONS */}
        {!isEditing ? (
          <>
            <Button
              type='button'
              onClick={handleEditClick}
              className='w-full border border-red-600 bg-transparent text-red-500 hover:text-white'
              variant='destructive'
            >
              Edit Profile
            </Button>
            <LogoutButton />
          </>
        ) : (
          <div className='flex gap-4'>
            <Button
              type='submit'
              disabled={isLoading}
              className='flex w-full items-center justify-center gap-2'
            >
              {isLoading ? (
                <>
                  <Loader2 className='h-4 w-4 animate-spin' />
                  Menyimpan...
                </>
              ) : (
                'Simpan'
              )}
            </Button>
            <Button
              type='button'
              onClick={handleCancel}
              className='w-full'
              variant='outline'
            >
              Batal
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

function FormField({ label, name, type = 'text', value, onChange, disabled }) {
  return (
    <div className='grid w-full items-center gap-3'>
      <Label htmlFor={name}>{label}</Label>
      <Input
        type={type}
        id={name}
        name={name}
        placeholder={label}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}
