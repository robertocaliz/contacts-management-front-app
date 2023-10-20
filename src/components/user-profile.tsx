'use client';

import userProfileStyles from '@/../styles/user-profile.module.css';
import { useEffect, useState } from 'react';
import { User } from '@/types';
import FormUpdateUser from './form-update-user';
import Image from 'next/image';
import defaultProfileImage from '@/../public/images/default-profile-image.jpg';
import { EditFormBackButton, EditUserButton } from './buttons.component';



export default function UserProfile({ userData }: { userData: User }) {


	const [user, setUser] = useState<User>();
	const [edit, setEdit] = useState(false);


	useEffect(() => {
		setUser(userData);
	}, [userData]);


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
				{!edit ? (
					<>
						<h1>Dados do utilizador</h1>
						<p>
							<span>Name</span>
							<span>{user?.name}</span>
						</p>
						<p>
							<span>Email</span>
							<span>{user?.email}</span>
						</p>
						<EditUserButton edit={edit} setEdit={setEdit} />
					</>
				) : (
					<>
						<EditFormBackButton edit={edit} setEdit={setEdit} />
						<FormUpdateUser userData={user as User} />
					</>

				)}
			</section>
		</div>
	);

}