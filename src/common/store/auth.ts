import { AuthType } from "common/type/AuthType";
import { atom, selector } from "recoil";

export const auth = atom<AuthType>({
    key: 'authLevel',
    default: {
        id: '',
        username: '',
        auth: 1,
    }
})
