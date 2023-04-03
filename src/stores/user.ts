import axios from 'axios';
import { defineStore } from 'pinia';
import {authApi} from './auth'
export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: JSON.parse(localStorage.getItem('user')!),
    }),
    actions: {
        async getAll() {
            this.users = { loading: true };
            try {
                await authApi.get('/users/me')
                    .then(users => this.users = users)
                    .catch(error => this.users = {error})
            } catch (e) {
                console.log(e)
            }
        },
        check() {
            return !!this.users
        }
    }
});