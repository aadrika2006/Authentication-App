import React, { useState, useEffect } from 'react'


useEffect(() => {
// try to refresh token on load to get access token
fetch(`${API}/refresh`, {
method: 'POST',
credentials: 'include'
}).then(async res => {
if (res.ok) {
const data = await res.json();
setAccessToken(data.accessToken);
}
}).catch(err => console.error(err));
}, []);


async function register(e){
e.preventDefault();
const res = await fetch(`${API}/register`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
credentials: 'include',
body: JSON.stringify({ email, password })
});
const data = await res.json();
if (res.ok) {
setAccessToken(data.accessToken);
setMessage('Registered and logged in');
} else {
setMessage(data.error || 'Register failed');
}
}


async function login(e){
e.preventDefault();
const res = await fetch(`${API}/login`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
credentials: 'include',
body: JSON.stringify({ email, password })
});
const data = await res.json();
if (res.ok) {
setAccessToken(data.accessToken);
setMessage('Logged in');
} else {
setMessage(data.error || 'Login failed');
}
}


async function callProtected(){
if (!accessToken) {
setMessage('No access token — try refre