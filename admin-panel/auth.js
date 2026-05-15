(() => {
  'use strict';

  const ENDPOINT = 'https://sfo.cloud.appwrite.io/v1';
  const PROJECT_ID = 'm2zpicks';
  const DEFAULT_ERROR = 'Please sign in with an authorized admin account.';

  function createAccount() {
    if (!window.Appwrite) throw new Error('Appwrite SDK did not load. Check your network connection.');
    const client = new Appwrite.Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);
    return new Appwrite.Account(client);
  }

  const account = createAccount();
  const googleProvider = () => Appwrite.OAuthProvider?.Google || Appwrite.OAuthProvider?.google || 'google';

  async function getCurrentUser() {
    try {
      return await account.get();
    } catch (_err) {
      return null;
    }
  }

  async function loginWithEmail(email, password) {
    await account.createEmailPasswordSession({ email, password });
    return account.get();
  }

  function loginWithGoogle() {
    account.createOAuth2Session({
      provider: googleProvider(),
      success: window.location.href,
      failure: window.location.href
    });
  }

  async function logout() {
    try {
      await account.deleteSession({ sessionId: 'current' });
    } catch (_err) {
      // Session may already be gone; continue to redirect/reset the page.
    }
    window.location.href = './index.html';
  }

  function setError(errorEl, message = DEFAULT_ERROR) {
    if (!errorEl) return;
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
  }

  function setUser(userEl, user) {
    if (!userEl || !user) return;
    userEl.textContent = user.name || user.email || user.$id || 'Admin';
  }

  function ensureGateStyles() {
    if (document.getElementById('adminAuthStyles')) return;
    const style = document.createElement('style');
    style.id = 'adminAuthStyles';
    style.textContent = `
      .admin-auth-gate{min-height:100vh;display:grid;place-items:center;padding:24px;background:radial-gradient(circle at 20% -10%,rgba(91,140,255,.18),transparent 34%),#0b1020;color:#ecf1ff;font-family:Inter,Arial,sans-serif}
      .admin-auth-card{width:min(440px,100%);background:#141c33;border:1px solid #2c3f72;border-radius:18px;padding:24px;box-shadow:0 24px 80px rgba(0,0,0,.32)}
      .admin-auth-card h1{margin:0 0 8px;font-size:30px;letter-spacing:-.04em}.admin-auth-card p{color:#9cb0e3;line-height:1.6}.admin-auth-card form{display:grid;gap:10px;margin-top:16px}.admin-auth-card input,.admin-auth-card button{border-radius:10px;border:1px solid #22345c;padding:11px;background:#0b142d;color:#ecf1ff;font:600 14px Inter,Arial}.admin-auth-card button{border:0;background:#5b8cff;cursor:pointer;font-weight:800}.admin-auth-card .secondary{background:#243862}.admin-auth-error{color:#ff9aa8;font-weight:700;min-height:20px}.admin-user-pill{display:inline-flex;align-items:center;gap:8px;padding:7px 10px;border:1px solid #22345c;border-radius:999px;color:#9cb0e3;background:#0b142d;font-size:12px;font-weight:800}
    `;
    document.head.appendChild(style);
  }

  function createGate() {
    ensureGateStyles();
    const gate = document.createElement('section');
    gate.className = 'admin-auth-gate';
    gate.innerHTML = `
      <div class="admin-auth-card">
        <h1>Admin sign in</h1>
        <p>Use your Appwrite admin account to access this admin page.</p>
        <form data-admin-auth-form>
          <input data-admin-auth-email type="email" autocomplete="email" placeholder="Email" required>
          <input data-admin-auth-password type="password" autocomplete="current-password" placeholder="Password" required>
          <button type="submit">Sign in with email</button>
          <button class="secondary" type="button" data-admin-google>Continue with Google</button>
        </form>
        <p class="admin-auth-error hidden" data-admin-error></p>
      </div>
    `;
    document.body.prepend(gate);
    return {
      gate,
      form: gate.querySelector('[data-admin-auth-form]'),
      emailInput: gate.querySelector('[data-admin-auth-email]'),
      passwordInput: gate.querySelector('[data-admin-auth-password]'),
      googleBtn: gate.querySelector('[data-admin-google]'),
      errorEl: gate.querySelector('[data-admin-error]')
    };
  }

  async function init(options = {}) {
    const gate = options.loginView ? {
      gate: options.loginView,
      form: options.loginForm,
      emailInput: options.emailInput,
      passwordInput: options.passwordInput,
      googleBtn: options.googleBtn,
      errorEl: options.errorEl
    } : createGate();

    const user = await getCurrentUser();
    if (user) {
      gate.gate?.classList.add('hidden');
      options.panelView?.classList.remove('hidden');
      setUser(options.userEl, user);
      options.onReady?.(user);
    } else {
      gate.gate?.classList.remove('hidden');
      options.panelView?.classList.add('hidden');
    }

    gate.form?.addEventListener('submit', async (event) => {
      event.preventDefault();
      gate.errorEl?.classList.add('hidden');
      const submit = gate.form.querySelector('button[type="submit"]');
      submit.disabled = true;
      submit.textContent = 'Signing in…';
      try {
        const signedIn = await loginWithEmail(gate.emailInput.value.trim(), gate.passwordInput.value);
        gate.gate?.classList.add('hidden');
        options.panelView?.classList.remove('hidden');
        setUser(options.userEl, signedIn);
        options.onReady?.(signedIn);
      } catch (err) {
        setError(gate.errorEl, err?.message || DEFAULT_ERROR);
      } finally {
        submit.disabled = false;
        submit.textContent = 'Sign in with email';
      }
    });

    gate.googleBtn?.addEventListener('click', () => {
      gate.errorEl?.classList.add('hidden');
      loginWithGoogle();
    });

    options.logoutBtn?.addEventListener('click', logout);
  }

  window.AdminAuth = { init, logout, getCurrentUser, loginWithGoogle, loginWithEmail };
})();
