<template>
  <header class="bg-slate-800 text-2xl text-white p-4">
    <nav>
      <ul class="list-none flex justify-between items-center w-full">
        <div class="flex gap-4">
          <li>
            <a href="/" class="text-white no-underline hover:underline">
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/new-activity"
              class="text-white no-underline hover:underline"
            >
              New Activity
            </a>
          </li>
        </div>
        <li>
          <a
            href="/logout"
            class="text-white no-underline mr-4 hover:underline"
          >
            Logout
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>
