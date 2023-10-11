'use client';

import { useUser } from '@/hooks';
import userProfileStyles from '@/../styles/user-profile.module.css';
import { useEffect, useState } from 'react';
import { User } from '@/types';
import FormUpdateUser from './form-update-user';
import Link from 'next/link';
import { BsPencil } from 'react-icons/bs';


export default function UserProfile({ userId }: { userId: number }) {


	const [user, setUser] = useState<User>();
	const [edit, setEdit] = useState(false);

	const {
		obj,
		error,
		isLoading
	} = useUser(userId);


	useEffect(() => {
		setUser(obj);
	}, [obj]);


	if (isLoading) return <h1>Loading user...</h1>
	if (error) return <h1>Error!</h1>


	return (
		<div className={userProfileStyles.container}>
			<section>
				<h1>Image</h1>
			</section>
			<section>
				{edit && <Link href={''} onClick={() => setEdit(!edit)}>&larr;Back</Link>}
				{!edit ? (
					<>
						<h1>User Data</h1>
						<p>
							<span>Name</span>
							<span>{user?.name}</span>
						</p>
						<p>
							<span>Email</span>
							<span>{user?.email}</span>
						</p>
						<p>
							<span>Birthday</span>
							<span>{user?.birthday}</span>
						</p>
						<Link href={''} onClick={() => setEdit(!edit)}>
							<BsPencil />
						</Link>
					</>
				) : (
					<FormUpdateUser user={user as User} />
				)}
			</section>
		</div>
	);

}