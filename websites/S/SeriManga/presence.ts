const presence = new Presence({
		clientId: "836589763896541195",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, search } = document.location;

	if (pathname === "/") presenceData.details = "Ana Sayfa";
	else if (pathname === "/fansublar")
		presenceData.details = "Çeviri Gruplarına Bakıyor";
	else if (pathname.startsWith("/fansub")) {
		presenceData.details = "Çeviri Grubu Görüntüleniyor:";
		presenceData.state = document.querySelector(
			".d-table > .d-cell > h1"
		).textContent;
	} else if (pathname === "/sikca-sorulan-sorular")
		presenceData.details = "Çeviri Sıkça Sorulan Sorular";
	else if (
		pathname.startsWith("/manga/") &&
		window.location.search.substr(0, 5) === "?page"
	) {
		presenceData.details = document.querySelector(".back").textContent;
		presenceData.state = `📖 Bölüm ${pathname.substring(
			pathname.lastIndexOf("/") + 1
		)} 📄 ${document
			.querySelector("#pageSelect > option:checked")
			.textContent.replace("\n", "")
			.replace("SAYFA", "")}`;
		presenceData.smallImageKey = "read";
		presenceData.buttons = [
			{ label: "Sayfaya Git", url: window.location.href },
		];
	} else if (pathname.startsWith("/manga/")) {
		presenceData.buttons = [
			{ label: "Sayfaya Git", url: window.location.href },
		];
		presenceData.details = "Çeviri mangaya:";
		presenceData.state = document.querySelector(".name").textContent;
		presenceData.smallImageKey = "view";
	} else if (pathname === "/mangalar" && search?.substr(0, 7) === "?search") {
		presenceData.details = "Arıyor:";
		presenceData.state = new URLSearchParams(search).get("search");
		presenceData.smallImageKey = "search";
	} else if (pathname === "/mangalar")
		presenceData.details = "Mangaya Göz Atıyor";
	else if (pathname.startsWith("/kategori")) {
		presenceData.details = "Mangaya Göz Atıyor";
		presenceData.state = `Tür: ${
			document.querySelector(".page__title").textContent
		}`;
	}
	presence.setActivity(presenceData);
});
