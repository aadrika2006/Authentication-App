require('dotenv').config();
const newRefresh = createRefreshToken(user);


// rotate refresh token: delete old, insert new
db.prepare('DELETE FROM refresh_tokens WHERE id = ?').run(stored.id);
db.prepare('INSERT INTO refresh_tokens (user_id, token) VALUES (?, ?)').run(user.id, newRefresh);


res.cookie(COOKIE_NAME, newRefresh, {
httpOnly: true,
// secure: true,
sameSite: 'lax',
path: '/api/refresh'
});


res.json({ accessToken: newAccess });
});


// logout
app.post('/api/logout', (req, res) => {
const token = req.cookies[COOKIE_NAME];
if (token) {
// remove from DB
db.prepare('DELETE FROM refresh_tokens WHERE token = ?').run(token);
}
res.clearCookie(COOKIE_NAME, { path: '/api/refresh' });
res.json({ ok: true });
});


// auth middleware
function authMiddleware(req, res, next) {
const auth = req.headers['authorization'];
if (!auth) return res.status(401).json({ error: 'Missing authorization header' });
const parts = auth.split(' ');
if (parts.length !== 2) return res.status(401).json({ error: 'Malformed authorization header' });
const token = parts[1];
try {
const payload = jwt.verify(token, ACCESS_TOKEN_SECRET);
req.user = { id: payload.userId, email: payload.email };
next();
} catch (err) {
return res.status(401).json({ error: 'Invalid or expired token' });
}
}


// protected route example
app.get('/api/protected', authMiddleware, (req, res) => {
res.json({ message: `Hello ${req.user.email}, this is protected data.`, user: req.user });
});


app.listen(PORT, () => {
console.log(`Auth server running on http://localhost:${PORT}`);
});