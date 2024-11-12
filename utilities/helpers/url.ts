import { authUrls, baseUrl, name } from "@/data/constants";

export const setRedirectUrl = (pathname?: string, targetUrl?: string, redirectUrl?: string) => {
	const target = targetUrl || authUrls.signIn;
	const redirect = redirectUrl || `${baseUrl}${pathname || "/"}`;
	return `${target}?${name.urlParam.redirect}=${encodeURIComponent(redirect)}`;
};

export const getUrlParam = (urlParamName?: string) => {
	if (typeof window !== "undefined") {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get(urlParamName || name.urlParam.redirect) || "/";
	}

	return "/";
};
