import { useUser } from './useUser'
import defaultUser from '/default-user.jpg'

function UserAvatar() {
    const { user } = useUser()

    return (
        <div className="flex items-center gap-5 text-[1.4rem] font-medium">
            <img
                className="block aspect-square w-14 rounded-full     border border-mako-grey-100 object-cover"
                src={defaultUser}
                alt={`Avatar of ${user?.user_metadata.fullName ? user.user_metadata.fullName : 'Nume'}`}
            ></img>
            <span>
                {user?.user_metadata.fullName
                    ? user.user_metadata.fullName
                    : 'Nume'}
            </span>
        </div>
    )
}

export default UserAvatar
