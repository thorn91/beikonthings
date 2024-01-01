<script lang="ts">
    import Header from './Header.svelte';
    import './styles.css';
    import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';
    import { onMount } from 'svelte';

    const { data } = $props();
    const { user } = data;

    const setupTasks = {
        shoelace: () => {
            setBasePath('.svelte-kit/shoelace');
            onMount(async () => await import('@shoelace-style/shoelace'));
        }
    };

    function initialize() {
        Object.values(setupTasks).forEach((task) => task());
    }

    initialize();
</script>

<div class="app">
    <Header />

    <main class="content">
        <slot />
    </main>

    <!-- <footer></footer> -->
</div>

<style>
    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        flex: 1;
    }

    footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 12px;
    }

    footer a {
        font-weight: bold;
    }

    @media (min-width: 480px) {
        footer {
            padding: 12px 0;
        }
    }
</style>
