/**
 * Gutenberg редактори за OI блоковете (нативна Block API регистрация).
 * Текстовете се редактират инлайн с RichText, изображенията - през страничния панел.
 */
(function (wp) {
	"use strict";

	var el = wp.element.createElement;
	var Fragment = wp.element.Fragment;
	var registerBlockType = wp.blocks.registerBlockType;
	var RichText = wp.blockEditor.RichText;
	var useBlockProps = wp.blockEditor.useBlockProps;
	var InnerBlocks = wp.blockEditor.InnerBlocks;
	var InspectorControls = wp.blockEditor.InspectorControls;
	var MediaUpload = wp.blockEditor.MediaUpload;
	var MediaUploadCheck = wp.blockEditor.MediaUploadCheck;
	var PanelBody = wp.components.PanelBody;
	var Button = wp.components.Button;
	var TextControl = wp.components.TextControl;
	var ServerSideRender = wp.serverSideRender;

	var THEME = (window.OIED && window.OIED.themeUri) || "";

	/** Панел за избор на изображение в Inspector-а. */
	function imagePanel(title, url, fallback, onSelect, onRemove) {
		return el(
			PanelBody,
			{ title: title, initialOpen: true },
			el("img", {
				src: url || fallback,
				style: { maxWidth: "100%", borderRadius: "8px", marginBottom: "8px" },
			}),
			el(
				MediaUploadCheck,
				{},
				el(MediaUpload, {
					onSelect: onSelect,
					allowedTypes: ["image"],
					render: function (obj) {
						return el(
							Button,
							{ variant: "secondary", onClick: obj.open },
							"Смени изображението"
						);
					},
				})
			),
			url
				? el(
						Button,
						{ variant: "link", isDestructive: true, onClick: onRemove },
						"Върни стандартното"
				  )
				: null
		);
	}

	function rt(tag, className, value, placeholder, onChange) {
		return el(RichText, {
			tagName: tag,
			className: className,
			value: value,
			placeholder: placeholder,
			onChange: onChange,
			allowedFormats: ["core/bold", "core/italic"],
		});
	}

	/* ================================================== oi/hero */
	registerBlockType("oi/hero", {
		edit: function (props) {
			var a = props.attributes;
			var set = props.setAttributes;
			var bp = useBlockProps();
			var img = a.imageUrl || THEME + "/assets/img/online-insurance.webp";

			return el(
				Fragment,
				{},
				el(
					InspectorControls,
					{},
					imagePanel(
						"Изображение",
						a.imageUrl,
						THEME + "/assets/img/online-insurance.webp",
						function (m) { set({ imageUrl: m.url, imageId: m.id }); },
						function () { set({ imageUrl: "", imageId: 0 }); }
					),
					el(
						PanelBody,
						{ title: "Линкове на бутоните", initialOpen: false },
						el(TextControl, { label: "Основен бутон URL", value: a.btnPrimaryUrl, onChange: function (v) { set({ btnPrimaryUrl: v }); } }),
						el(TextControl, { label: "Втори бутон URL", value: a.btnSecondaryUrl, onChange: function (v) { set({ btnSecondaryUrl: v }); } }),
						el(TextControl, { label: "Badge линк URL", value: a.badgeLinkUrl, onChange: function (v) { set({ badgeLinkUrl: v }); } })
					)
				),
				el(
					"div",
					bp,
					el(
						"div",
						{ className: "bg-white relative", style: { overflow: "hidden" } },
						el(
							"div",
							{ className: "mx-auto max-w-7xl", style: { position: "relative" } },
							el(
								"div",
								{ className: "relative z-10 pt-0", style: { maxWidth: "42rem" } },
								el(
									"div",
									{ className: "relative px-6 py-12" },
									el(
										"div",
										{ className: "max-w-xl" },
										el(
											"div",
											{ className: "mt-2 mb-10 flex" },
											el(
												"div",
												{ className: "relative rounded-full px-3 py-1 text-sm/6 text-gray-500 ring-1 ring-gray-900/10" },
												rt("span", "", a.badgeText, "Badge текст...", function (v) { set({ badgeText: v }); }),
												" ",
												rt("span", "font-semibold whitespace-nowrap text-[#47a7d7]", a.badgeLinkText, "Линк текст...", function (v) { set({ badgeLinkText: v }); })
											)
										),
										rt("h1", "text-4xl font-semibold tracking-tight text-gray-900 sm:text-7xl font-display", a.title, "Заглавие...", function (v) { set({ title: v }); }),
										rt("p", "mt-8 text-4xl font-medium font-display", a.tagline, "Подзаглавие...", function (v) { set({ tagline: v }); }),
										rt("p", "mt-8 text-lg font-medium text-gray-500 sm:text-xl/8 font-display", a.descDesktop, "Описание (десктоп)...", function (v) { set({ descDesktop: v }); }),
										el("p", { style: { marginTop: "12px", fontSize: "11px", color: "#9ca3af" } }, "Мобилно описание (по-кратко):"),
										rt("p", "text-sm font-medium text-gray-500 font-display", a.descMobile, "Описание (мобилно)...", function (v) { set({ descMobile: v }); }),
										el(
											"div",
											{ className: "mt-10 flex items-center gap-x-6" },
											rt("span", "rounded-md bg-[#47a7d7] px-3.5 py-2.5 text-sm font-semibold text-black", a.btnPrimaryText, "Бутон...", function (v) { set({ btnPrimaryText: v }); }),
											rt("span", "text-sm/6 font-semibold text-gray-900", a.btnSecondaryText, "Втори бутон...", function (v) { set({ btnSecondaryText: v }); })
										)
									)
								)
							),
							el("img", {
								src: img,
								style: { position: "absolute", top: 0, right: 0, bottom: 0, width: "40%", height: "100%", objectFit: "cover" },
							})
						)
					)
				)
			);
		},
		save: function () { return null; },
	});

	/* ================================================== oi/incentives */
	registerBlockType("oi/incentives", {
		edit: function (props) {
			var a = props.attributes;
			var set = props.setAttributes;
			var bp = useBlockProps();
			var img = a.imageUrl || THEME + "/assets/img/insurance.jpg";

			return el(
				Fragment,
				{},
				el(
					InspectorControls,
					{},
					imagePanel(
						"Изображение",
						a.imageUrl,
						THEME + "/assets/img/insurance.jpg",
						function (m) { set({ imageUrl: m.url, imageId: m.id }); },
						function () { set({ imageUrl: "", imageId: 0 }); }
					)
				),
				el(
					"div",
					bp,
					el(
						"div",
						{ className: "bg-gray-900", style: { padding: "48px 24px", borderRadius: "4px" } },
						el(
							"div",
							{ className: "grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2" },
							el(
								"div",
								{},
								rt("h2", "text-4xl font-bold tracking-tight text-white", a.title, "Заглавие...", function (v) { set({ title: v }); }),
								rt("p", "mt-4 text-white", a.description, "Описание...", function (v) { set({ description: v }); })
							),
							el("img", { src: img, className: "w-full rounded-lg object-cover" })
						),
						el(
							"div",
							{ className: "mt-16 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3" },
							el(InnerBlocks, {
								allowedBlocks: ["oi/incentive-item"],
								template: [
									["oi/incentive-item"],
									["oi/incentive-item"],
									["oi/incentive-item"],
								],
							})
						)
					)
				)
			);
		},
		save: function () {
			return el(InnerBlocks.Content, {});
		},
	});

	/* ================================================== oi/incentive-item */
	registerBlockType("oi/incentive-item", {
		edit: function (props) {
			var a = props.attributes;
			var set = props.setAttributes;
			var bp = useBlockProps();
			var icon = a.iconUrl || THEME + "/assets/img/icons/cta-icon-1.svg";

			return el(
				Fragment,
				{},
				el(
					InspectorControls,
					{},
					imagePanel(
						"Икона",
						a.iconUrl,
						THEME + "/assets/img/icons/cta-icon-1.svg",
						function (m) { set({ iconUrl: m.url, iconId: m.id }); },
						function () { set({ iconUrl: "", iconId: 0 }); }
					)
				),
				el(
					"div",
					bp,
					el(
						"div",
						{ className: "sm:flex lg:block" },
						el(
							"div",
							{ className: "h-14 w-14 flex items-center justify-center rounded-full bg-[#47a7d7]" },
							el("img", { src: icon, className: "h-10 w-10", style: { filter: "brightness(0) invert(1)" } })
						),
						el(
							"div",
							{ className: "mt-4 lg:mt-6" },
							rt("h3", "text-sm font-medium text-white", a.title, "Заглавие...", function (v) { set({ title: v }); }),
							rt("p", "mt-2 text-sm text-white", a.text, "Текст...", function (v) { set({ text: v }); })
						)
					)
				)
			);
		},
		save: function () { return null; },
	});

	/* ================================================== oi/partners */
	registerBlockType("oi/partners", {
		edit: function (props) {
			var a = props.attributes;
			var set = props.setAttributes;
			var bp = useBlockProps();
			var logo = a.logoUrl || THEME + "/assets/img/partners/Insurancebg-logo.svg";

			return el(
				Fragment,
				{},
				el(
					InspectorControls,
					{},
					imagePanel(
						"Лого на партньора",
						a.logoUrl,
						THEME + "/assets/img/partners/Insurancebg-logo.svg",
						function (m) { set({ logoUrl: m.url, logoId: m.id, logoAlt: m.alt || a.logoAlt }); },
						function () { set({ logoUrl: "", logoId: 0 }); }
					)
				),
				el(
					"div",
					bp,
					el(
						"div",
						{ className: "bg-white py-24" },
						el(
							"div",
							{ className: "mx-auto max-w-7xl px-6 lg:px-8" },
							el(
								"div",
								{ className: "grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2" },
								el(
									"div",
									{ className: "mx-auto w-full max-w-xl lg:mx-0" },
									rt("h2", "text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl", a.title, "Заглавие...", function (v) { set({ title: v }); }),
									rt("p", "mt-6 text-lg/8 text-gray-600", a.description, "Описание...", function (v) { set({ description: v }); })
								),
								el("img", { src: logo, className: "h-16 w-auto object-contain" })
							)
						)
					)
				)
			);
		},
		save: function () { return null; },
	});

	/* ================================================== oi/latest-posts */
	registerBlockType("oi/latest-posts", {
		edit: function (props) {
			var a = props.attributes;
			var set = props.setAttributes;
			var bp = useBlockProps();

			return el(
				Fragment,
				{},
				el(
					InspectorControls,
					{},
					el(
						PanelBody,
						{ title: "Настройки", initialOpen: true },
						el(TextControl, {
							label: "Заглавие на секцията",
							value: a.title,
							onChange: function (v) { set({ title: v }); },
						}),
						el(TextControl, {
							label: "Брой публикации",
							type: "number",
							value: a.count,
							onChange: function (v) { set({ count: parseInt(v, 10) || 3 }); },
						})
					)
				),
				el(
					"div",
					bp,
					el(ServerSideRender, { block: "oi/latest-posts", attributes: a })
				)
			);
		},
		save: function () { return null; },
	});

	/* ================================================== oi/cta */
	registerBlockType("oi/cta", {
		edit: function (props) {
			var a = props.attributes;
			var set = props.setAttributes;
			var bp = useBlockProps();

			return el(
				Fragment,
				{},
				el(
					InspectorControls,
					{},
					el(
						PanelBody,
						{ title: "Линкове на бутоните", initialOpen: false },
						el(TextControl, { label: "Основен бутон URL", value: a.btnPrimaryUrl, onChange: function (v) { set({ btnPrimaryUrl: v }); } }),
						el(TextControl, { label: "Втори бутон URL", value: a.btnSecondaryUrl, onChange: function (v) { set({ btnSecondaryUrl: v }); } })
					)
				),
				el(
					"div",
					bp,
					el(
						"div",
						{ className: "relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:px-16", style: { borderRadius: "4px" } },
						rt("h2", "text-4xl font-semibold tracking-tight text-white sm:text-5xl", a.title, "Заглавие...", function (v) { set({ title: v }); }),
						rt("p", "mx-auto mt-6 max-w-xl text-lg/8 text-gray-300", a.description, "Описание...", function (v) { set({ description: v }); }),
						el(
							"div",
							{ className: "mt-10 flex items-center justify-center gap-x-6" },
							rt("span", "rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900", a.btnPrimaryText, "Бутон...", function (v) { set({ btnPrimaryText: v }); }),
							rt("span", "text-sm/6 font-semibold text-white", a.btnSecondaryText, "Втори бутон...", function (v) { set({ btnSecondaryText: v }); })
						)
					)
				)
			);
		},
		save: function () { return null; },
	});
})(window.wp);
