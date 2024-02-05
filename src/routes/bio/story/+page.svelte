<script>
	const timelineData = [
		{
			year: '1994',
			event: 'Born',
			description:
				'I was born in a village within the Kulon Progo regency, which is located at the westernmost part of the Daerah Istimewa Yogyakarta province.'
		},
		{
			year: '1999',
			event: 'Introduced with digital Technology',
			description:
				'I was first drawn to digital technology as a child. I played Metal Slug X on the Sony PSX, learned to operate Windows 95 on a desktop, and delved into ancient Nintendo 64 titles like Mario and Contra. My tech adventure had just begun!'
		},
		{
			year: '2004',
			event: 'Introduced with PS2',
			description:
				'Play PS2 for first time, I remember played GTA Vice City'
		},
		{
			year: '2005',
			event: 'Join Child Fund Indonesia (formerly Christian Children Fund)',
			description: 'Participating as a member who granted support education.'
		},
		{
			year: '2006',
			event: 'Attended National Child Day Semarang',
			description: 'Attended as audiens for english speaking audition'
		}
	];
</script>

<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
    crossorigin="anonymous"
/>

<div class="h-full bg-gray-100">
    <div class="flex justify-center">
        <div class="w-full overflow-y-auto max-h-screen">
            {#each timelineData as event, i}
                <div class="flex flex-row w-full">
                    {#if i % 2 === 0}
                        <div class="w-2/5 px-2 py-10">
                            <div class="flex flex-col w-full rounded-lg shadow bg-white px-4 py-5">
                                <div class="text-gray-600 mb-2 flex justify-between">
                                    <div class="font-bold">{event.event}</div>
                                </div>
                                <div class="text-gray-600 text-justify">
                                    {event.description}
                                </div>
                            </div>
                        </div>
                    {:else}
                        <div class="w-2/5 px-2 py-10"></div>
                    {/if}
                    <div class="w-1/5 flex justify-center">
                        <div class="relative flex h-full w-1 bg-green-300 items-center justify-center">
                            <div
                                class="absolute flex flex-col justify-center h-24 w-24 rounded-full border-2 border-green-300 leading-none text-center z-10 bg-white font-thin"
                            >
                                <div>{event.year}</div>
                            </div>
                        </div>
                    </div>
                    {#if i % 2 === 1}
                        <div class="w-2/5 px-2 py-10">
                            <div class="flex flex-col w-full rounded-lg shadow bg-white px-4 py-5">
                                <div class="text-gray-600 mb-2 flex justify-between">
                                    <div class="font-bold">{event.event}</div>
                                </div>
                                <div class="text-gray-600 text-justify">
                                    {event.description}
                                </div>
                            </div>
                        </div>
                    {:else}
                        <div class="w-2/5 px-2 py-10"></div>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</div>