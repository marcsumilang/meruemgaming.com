<script>
  let allow = null

  try {
    allow = JSON.parse(window.localStorage.getItem('allowCookie'))
  } catch (error) {}
</script>

<div
  class={`alert shadow-lg bg-base-100 w-full md:max-w-3xl float-right text-base-content sticky bottom-0 mb-3 mt-10 ${
    allow != null ? 'hidden' : 'flex'
  }`}
>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="stroke-info flex-shrink-0 w-6 h-6"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      /></svg
    >
    <span>THIS SITE USES COOKIES TO ENSURE YOU GET THE BEST EXPERIENCE </span>
  </div>
  <div class="flex-none">
    <button
      class="btn btn-sm btn-ghost"
      on:click={() => {
        window.localStorage.setItem('allowCookie', JSON.stringify('no'))
      }}>Learn more</button
    >
    <button
      class="btn btn-sm btn-warning"
      on:click={() => {
        allow = 'yes'
        window.localStorage.setItem('allowCookie', JSON.stringify('yes'))
      }}>OK</button
    >
  </div>
</div>
