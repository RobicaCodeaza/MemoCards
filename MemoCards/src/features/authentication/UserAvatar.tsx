import { useUser } from './useUser'
import defaultUser from '/default-user.jpg'

function UserAvatar() {
    const { user } = useUser()

    return (
        <div className="flex items-center gap-5 text-[1.4rem] font-medium">
            <img
                className="block aspect-square w-14 rounded-full     border border-mako-grey-100 object-cover"
                src={defaultUser || user?.user_metadata.avatar}
                alt={`Avatar of ${user?.user_metadata.fullName ? user.user_metadata.fullName : 'DefaultName'}`}
            ></img>
            <span>
                {user?.user_metadata.fullName
                    ? user.user_metadata.fullName
                    : 'DefaultName'}
            </span>
        </div>
    )
}

export default UserAvatar
