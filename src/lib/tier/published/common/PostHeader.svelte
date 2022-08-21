<script>
	import dayjs from 'dayjs';
	export let tierData;
</script>

<div class="flex flex-row gap-2">
	<div class="avatar">
		<div class="w-16 rounded-full">
			<img src={tierData.created_by_image} alt={tierData.created_by} />
		</div>
	</div>
	<p class="pt-2">
		Guide Author: {tierData.created_by} <br />
		<span class="text-xs">{dayjs(tierData.created_at).format('MMM DD, YYYY H:mm A')}</span>
	</p>
</div>

<p>{tierData.tier_name}</p>
<p class="">
	{tierData.tier_description}
	<!-- <span class="float-right text-xs">www.mlbbhero.com</span> -->
</p>
