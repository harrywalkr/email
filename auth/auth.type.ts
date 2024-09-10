import { User } from 'src/users/user.entity';

type UserDetails = Omit<User, 'password'>;
export { UserDetails };
