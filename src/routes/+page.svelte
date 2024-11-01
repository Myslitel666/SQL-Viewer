<script lang='ts'>
	import { ThemeProvider } from "svelte-elegant";

	import { onMount } from 'svelte';

	let data = [];
	let error;

	onMount(async () => {
    try {
		console.log('data: ' + process.env.DATABASE_URL);

      	const response = await fetch('/api/data'); // вызываем API эндпоинт
      	if (!response.ok) throw new Error(`Ошибка загрузки данных: ${response.statusText}`);

      	data = await response.json(); // разбираем JSON-ответ

	  	console.log(data);
    } catch (err) {
		error = (err as Error).message; // приведение типа к Error
    }
  });

	//Styles
	let primary = '#5bb056';
</script>

<ThemeProvider>
	<div class = 'header'>
		<button>
			<img src = './USD-Coin-Logo-PNG-Color.png' class = 'logo'>
			<p class = 'logo-p'>
				<span style:color={primary}>
					SQL Viewer
				</span> 
			</p>
		</button>
	</div>
	<div class = 'content'>
		<div 
			class = 'main-box'
			style:margin-top = 0.25rem
			style:border = 'solid #d2d2d2 1px'
			style:background-color = #fafafa
		>
			{data}
		</div>
	</div>
</ThemeProvider>

<style>
	.header {
		height: 4rem;
		display: flex;
		align-items: center; /* Центрирует по вертикали */
	}

	.content {
		margin-left: 1rem;
		margin-right: 1rem;
		display: flex;
		flex-direction: column; /* Располагает элементы в колонку */
		align-items: center;
		justify-content: center; /* Центрирует по горизонтали */
	}

	.main-box {
		position: relative;
		padding: 1rem;
		display: flex;
		flex-direction: column; /* Располагает элементы вертикально */
		align-items: center; /* Опционально: центрирует элементы по горизонтали */
		width: 650px;
		border-radius: 7px;
		gap: 0.2rem
	}

	.logo {
		margin-left: 0.5rem;
		width: 3rem;
		height: 3rem;
		transition: transform 0.5s;
	}

	.logo-p {
		margin-left: 0.5rem;
		font-size: 26px;
		color: #383838;
	}

	.logo:hover {
		transform: scale(1.2);
	}

	@media (max-width: 725px) {
		.main-box {
			width: 100%; /* Ширина main-box станет 100% на экранах меньше 768px */
		}

		.content {
			padding-left: 1rem;
			padding-right: 1rem;
		}
	}
</style>