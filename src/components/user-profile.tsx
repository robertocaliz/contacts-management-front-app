'use client';

import userProfileStyles from '@/../styles/user-profile.module.css';
import { useEffect, useState } from 'react';
import { User } from '@/types';
import FormUpdateUser from './form-update-user';
import Image from 'next/image';
import defaultProfileImage from '@/../public/images/default-profile-image.jpg';
import { UpdateUserButton, UserProfileBackButton } from './buttons.component';
import Spinner from './spinner';



export default function UserProfile({
	_userData
}: { _userData: User }) {


	const [userData, setUserData] = useState<User>();
	const [loadingUser, setLoadingUser] = useState(true);
	const [showUpdateUserForm, setShowUpdateUserForm] = useState(false);


	useEffect(() => {
		setUserData(_userData);
		setLoadingUser(false);
	}, [userData]);


	if (loadingUser) {
		return <Spinner loading={loadingUser} text='Carregando utilizador...' />;
	}

	return (
		<div className={userProfileStyles.container}>
			<section>
				<Image
					src={defaultProfileImage}
					alt='User image'
					width={400}
					height={400}
					style={{
						borderRadius: '14rem'
					}}
				/>
			</section>
			<section>
				{!showUpdateUserForm ? (
					<>
						<h2>Dados do utilizador</h2>
						<p>
							<span>Name</span>
							<span>{userData?.name}</span>
						</p>
						<p>
							<span>Email</span>
							<span>{userData?.email}</span>
						</p>
						<UpdateUserButton
							onClick={() => setShowUpdateUserForm(!showUpdateUserForm)}
						/>
					</>
				) : (
					<>
						<UserProfileBackButton
							onClick={() => setShowUpdateUserForm(!showUpdateUserForm)}
						/>
						<FormUpdateUser
							userData={userData as User}
							setUserData={setUserData}
							setShowUpdateUserForm={setShowUpdateUserForm}
						/>
					</>
				)}
			</section>
		</div>
	);

}