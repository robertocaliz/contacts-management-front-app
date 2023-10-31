'use client';

import userProfileStyles from '@/../styles/user-profile.module.css';
import { useEffect, useState } from 'react';
import { User } from '@/types';
import FormUpdateUser from './form-update-user';
import Image from 'next/image';
import defaultProfileImage from '@/../public/images/default-profile-image.jpg';
import { EditFormBackButton, EditUserButton } from './buttons.component';
import Spinner from './spinner';
import FormHeader from './form-header';



export default function UserProfile({
	userData
}: { userData: User }) {


	const [userData_, setUserData] = useState<User>();
	const [editUserData, setEditUserData] = useState(false);
	const [loadingUser, setLoadingUser] = useState(true);

	useEffect(() => {
		setUserData(userData);
		setLoadingUser(!loadingUser);
	}, [userData]);


	if (loadingUser) {
		return <Spinner loading={loadingUser} text='loading user...' />;
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
				{!editUserData ? (
					<>
						<FormHeader text='Dados do utilizador' />
						<p>
							<span>Name</span>
							<span>{userData_?.name}</span>
						</p>
						<p>
							<span>Email</span>
							<span>{userData_?.email}</span>
						</p>
						<EditUserButton edit={editUserData} setEdit={setEditUserData} />
					</>
				) : (
					<>
						<EditFormBackButton edit={editUserData} setEdit={setEditUserData} />
						<FormUpdateUser
							userData={userData_ as User}
							setUserData={setUserData}
							setEditUserData={setEditUserData}
						/>
					</>

				)}
			</section>
		</div>
	);

}