import { APP_ROUTES } from "@/constants/app-routes";
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"

type PrivateRouteProps = {
	children: ReactNode
}

// Check is authenticated

export default function PrivateRoute({ children }: PrivateRouteProps) {
	

	const { push } = useRouter();
	const isUserAuthenticated = false;

	useEffect(() => {
		if (!isUserAuthenticated) {
			push(APP_ROUTES.public.login);
		}
	}, [isUserAuthenticated, push]);


	return (
		<>
			{!isUserAuthenticated && null}
			{isUserAuthenticated && children}
		</>
	)

}