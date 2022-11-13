export const getArticles = async (
	max: number = 12,
	page: number = 0,
	orderby: string = "datetime desc"
): Promise<{ articles: Article[]; all: number }> => {
	const sanity = useSanity();
	const query = groq`{
		"all": count(*[_type=="article"]),
		"articles":*[_type=="article"] | order(${orderby})[$min...$max] {
			title,
			"slug": slug.current,
			"imageUrl": image.asset -> url,
			body[]{
				...,
				_type == "image" => {
					"asset": asset->{
						altText, 
						url
  					}
				}
			},
			showTitleImage,
			datetime
		}
	}`;
	return await sanity.fetch<{ articles: Article[]; all: number }>(query, {
		min: page * max,
		max: (page + 1) * max,
	});
};

export const getArticle = async (slug: string): Promise<Article> => {
	const sanity = useSanity();
	const query = groq`*[_type=="article" && slug.current==$slug][0]{
		title,
		"slug": slug.current,
		"imageUrl": image.asset -> url,
		body[]{
			...,
			_type == "image" => {
				"asset": asset->{
					altText, 
					url
				  }
			}
		},
		showTitleImage,
		datetime
	}`;
	return await sanity.fetch(query, { slug });
};

export const getPreviewFromArticle = (
	article: Article,
	maxLenght: number
): string => {
	const firstArticle = article.body.find((x) => x._type == "block");
	let preview = "";
	for (const child of firstArticle.children) {
		preview = preview.concat(child.text);
		if (preview.length > maxLenght - 3) {
			preview = preview.substring(0, maxLenght - 3);
			preview = preview + "...";
			break;
		}
	}
	return preview;
};

export const getDateFromArticle = (article: Article) => {
	const formatter = Intl.DateTimeFormat("pl-PL", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		weekday: "short",
	});
	return formatter.format(new Date(article.datetime));
};

export const parsePage = (page: string) => {
	function isNumeric(value: string) {
		return /^-?\d+$/.test(value);
	}
	if (!isNumeric(page)) return 1;
	const pageNum = parseInt(page);
	if (pageNum <= 0) return 1;
	return pageNum;
};
