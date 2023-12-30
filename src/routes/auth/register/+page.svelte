<script lang="ts">
    import { enhance } from '$app/forms';
    import logo from '$lib/images/brand/logo/logo_solid_blue.svg';
</script>

<div class="container">
    <img src={logo} alt="Logo" />
    <sl-card>
        <form method="post" use:enhance>
            <label for="email">Email</label>
            <sl-input name="email" type="email" id="username"></sl-input>
            <label for="password">Password</label>
            <sl-input name="password" type="password" id="username"></sl-input>

            <sl-divider style="--spacing: 9rem;"></sl-divider>

            <sl-button type="submit">Submit</sl-button>
        </form>
    </sl-card>
</div>

<style>
    .container {
        grid-column: full;
        display: grid;
        justify-content: center;
        align-content: center;
    }

    h2 {
        font-size: var(--largest-font-size);
    }

    form {
        display: grid;
        gap: 4px;
    }
</style>
