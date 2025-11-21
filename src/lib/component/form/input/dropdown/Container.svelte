<script lang="ts" module>
	const getButtons = (dropdown: HTMLDivElement): NodeListOf<HTMLButtonElement> => {
		return dropdown.querySelectorAll<HTMLButtonElement>('button');
	};

	const getFocusedButtonIndex = (buttons: NodeListOf<HTMLButtonElement>): number => {
		const activeElement = document.activeElement;
		return Array.from(buttons).findIndex((button) => button === activeElement);
	};

	const focusButton = (buttons: NodeListOf<HTMLButtonElement>, index: number) => {
		buttons[index]?.focus();
	};

	const setFocusFirstButton = (buttons: NodeListOf<HTMLButtonElement>) => {
		buttons[0]?.focus();
	};

	const setFocusLastButton = (buttons: NodeListOf<HTMLButtonElement>) => {
		buttons[buttons.length - 1]?.focus();
	};
</script>

<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	type Props = {
		id: string;
		children: Snippet;
		visible?: boolean;
	};
	let { id, children, visible = $bindable(false) }: Props = $props();

	// Esta función maneja el cambio de foco entre el dropdown y el input
	const focusChangeHandler = (input: HTMLInputElement, dropdown: HTMLDivElement) => {
		// Usamos un setTimeout para esperar al siguiente ciclo de eventos
		setTimeout(() => {
			const activeElement = document.activeElement;

			if (dropdown.contains(activeElement)) {
				return (visible = true);
			}

			if (activeElement === input) {
				return (visible = true);
			}

			visible = false;
		}, 0);
	};

	onMount(() => {
		const input = document.getElementById(`${id}`) as HTMLInputElement;
		const dropdown = document.getElementById(`${id}-dropdown`) as HTMLDivElement;

		const keyHandler = (event: KeyboardEvent) => {
			switch (event.key) {
				case 'ArrowUp': {
					const buttons = getButtons(dropdown);
					const currentIndex = getFocusedButtonIndex(buttons);

					if (currentIndex === -1) {
						setFocusLastButton(buttons);
					}

					const hasPrevIndex = currentIndex - 1 >= 0;

					if (hasPrevIndex) {
						return focusButton(buttons, currentIndex - 1);
					}

					return;
				}
				case 'ArrowDown': {
					const buttons = getButtons(dropdown);
					const currentIndex = getFocusedButtonIndex(buttons);

					if (currentIndex === -1) {
						return setFocusFirstButton(buttons);
					}

					const hasNextIndex = currentIndex + 1 < buttons.length;

					if (hasNextIndex) {
						return focusButton(buttons, currentIndex + 1);
					}

					setFocusFirstButton(buttons);

					break;
				}
				case 'Enter': {
					const buttons = getButtons(dropdown);
					const currentIndex = getFocusedButtonIndex(buttons);

					console.log('ENTER', currentIndex);

					if (currentIndex !== -1) {
						buttons[currentIndex]?.click();
					}

					break;
				}
				case 'Escape': {
					input.blur();
					visible = false;
					break;
				}
			}
		};
		input.addEventListener('keydown', (event) => keyHandler(event));
		dropdown.addEventListener('keydown', (event) => keyHandler(event));

		input.addEventListener('focusin', () => focusChangeHandler(input, dropdown));
		input.addEventListener('focusout', () => focusChangeHandler(input, dropdown));

		return () => {
			input.removeEventListener('keydown', (event) => keyHandler(event));
			dropdown.removeEventListener('keydown', (event) => keyHandler(event));

			input.removeEventListener('focusin', () => focusChangeHandler(input, dropdown));
			input.removeEventListener('focusout', () => focusChangeHandler(input, dropdown));
		};
	});
</script>

<div id="{id}-dropdown" class="dropdown-container" class:dropdown-hidden={!visible}>
	{@render children()}
</div>

<style>
	.dropdown-container {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		margin-top: 0.25rem;
		background-color: #1e293b;
		border: 1px solid #334155;
		border-radius: 0.375rem;
		max-height: 200px;
		overflow-y: auto;
		z-index: 300;
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}

	.dropdown-hidden {
		display: none;
	}
</style>
