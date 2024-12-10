<template>
  <header class="bg-slate-800 text-2xl text-white p-4">
    <nav>
      <ul class="list-none flex justify-between items-center w-full">
        <div class="flex gap-4">
          <li>
            <router-link to="/dashboard" class="text-white no-underline hover:underline">
              Dashboard
            </router-link>
          </li>
          <li>
            <router-link to="/new-activity" class="text-white no-underline hover:underline">
              New Activity
            </router-link>
          </li>
          <li>
            <router-link to="/timer" class="text-white no-underline hover:underline">
              Timer
            </router-link>
          </li>
        </div>
        <div class="list-none flex">
          <li>
          <router-link to="/register" class="text-white no-underline mr-4 hover:underline">
            New User
          </router-link>
        </li>
        <li>
          <router-link to="/logout" class="text-white no-underline mr-4 hover:underline">
            Logout
          </router-link>
        </li>
      </div>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>