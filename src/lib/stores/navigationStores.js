// import axios from 'axios'
import { writable } from 'svelte/store';
import { client } from '$lib/sanityClient';

export const hideSideBar = writable(['/create']);
export const showSideBar = writable(true);
export const pageViews = writable(0);
export const loading = writable(false);
