<template>
	<nav class="uk-navbar-container uk-navbar-transparent navbar" uk-navbar>
		<div class="uk-navbar-left">
			<a class="uk-navbar-item uk-logo" @click="clickHome">
				<img src="/src/public/assets/logo.png" alt="Logo" width="150" />
			</a>
		</div>

		<div class="uk-navbar-right">
			<ul class="uk-navbar-nav">
				<li class="uk-active"><a @click="clickHome">Home</a></li>
				<li>
					<a href="#">Shop</a>
					<div class="uk-navbar-dropdown">
						<ul class="uk-nav uk-navbar-dropdown-nav">
							<li><a href="#">Clothing</a></li>
							<li><a href="#">Accessories</a></li>
							<li><a href="#">Shoes</a></li>
						</ul>
					</div>
				</li>
				<li><a href="#">About</a></li>
				<li><a href="#">Contact</a></li>
			</ul>
		</div>
	</nav>
</template>

<style>
.navbar {
	background-color: #3a23ad;
	padding: 0px 10rem;
}
.uk-navbar-nav > li > a {
	color: white !important;
	font-weight: bold;
}
</style>

<script setup>
const clickHome = () => {
	window.location.reload();
};
</script>
