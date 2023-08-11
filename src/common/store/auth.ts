import { AuthType } from "common/type/AuthType";
import { atom } from "recoil";

export const authState = atom<AuthType>({
    key: 'authLevel',
    default: {
        id: '',
        username: '',
        role: 0,
    }
})
