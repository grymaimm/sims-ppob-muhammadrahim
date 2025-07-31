'use client';

import { Button } from '@/components/shadcnui/button';
import { Input } from '@/components/shadcnui/input';
import { Label } from '@/components/shadcnui/label';
import {
  fetchProfile,
  updateProfile,
  updateProfileImage,
} from '@/store/slices/userSlice';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function AccountModels() {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    image: null,
  });

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        image: null,
      });
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setIsEditing(false);
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        image: null,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.image) {
      await dispatch(updateProfileImage(formData.image));
    }

    if (
      formData.first_name !== profile.first_name ||
      formData.last_name !== profile.last_name
    ) {
      await dispatch(
        updateProfile({
          first_name: formData.first_name,
          last_name: formData.last_name,
        }),
      );
    }

    setIsEditing(false);
  };

  return (
    <div className='w-full'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6 py-6'>
        {/* FOTO */}
        <div className='flex flex-col items-center justify-center gap-4'>
          <div className='flex items-center gap-4'>
            <div className='relative size-24 w-max rounded-full border'>
              <Image
                src={profile?.profile_image || '/asset/Profile Photo.png'}
                alt='Profile'
                width={80}
                height={80}
                className='size-24 rounded-full object-cover'
              />
            </div>
            <div>
              <Label className='mb-1 block'>Foto Profil</Label>
              <Input
                type='file'
                accept='image/*'
                name='image'
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>
          <h3 className='text-3xl font-semibold'>
            {loading
              ? 'Loading...'
              : `${profile?.first_name} ${profile?.last_name}`}
          </h3>
        </div>

        {/* NAMA DEPAN */}
        <div className='grid w-full items-center gap-3'>
          <Label htmlFor='first_name'>Nama Depan</Label>
          <Input
            type='text'
            id='first_name'
            name='first_name'
            placeholder='Nama Depan'
            value={formData.first_name}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        {/* NAMA BELAKANG */}
        <div className='grid w-full items-center gap-3'>
          <Label htmlFor='last_name'>Nama Belakang</Label>
          <Input
            type='text'
            id='last_name'
            name='last_name'
            placeholder='Nama Belakang'
            value={formData.last_name}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        {/* BUTTONS */}
        {!isEditing ? (
          <Button
            onClick={handleEditClick}
            className='w-full'
            variant='default'
          >
            Edit Profile
          </Button>
        ) : (
          <div className='flex gap-4'>
            <Button type='submit' className='w-full' variant='destructive'>
              Simpan
            </Button>
            <Button onClick={handleCancel} className='w-full' variant='outline'>
              Batal
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
