<script lang="ts">
    import { enhance } from '$app/forms';
</script>

<h1>Sign in</h1>
<form method="post" use:enhance>
    <label for="email">Username</label>
    <input name="email" id="username" /><br />
    <label for="password">Password</label>
    <input type="password" name="password" id="password" /><br />
    <input type="submit" />
</form>
<a href="/auth/login">Create an account</a>
