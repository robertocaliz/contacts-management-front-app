import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SessionNotFoundError } from "@/lib/errors";
import { getServerSession } from "next-auth";


export const getAuthenticatedUserId = async () => {
	const session = await getServerSession(authOptions);
	if (!session) {
		throw new SessionNotFoundError('Session not found!');
	}
	return session.user?.id as number;
}