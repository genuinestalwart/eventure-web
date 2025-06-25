import { TypographyStylesProvider } from "@mantine/core";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkYoutube from "remark-youtube";

const DisplayMarkdown = ({ text }: { text: string }) => {
	return (
		<TypographyStylesProvider className='markdown'>
			<ReactMarkdown
				components={{
					iframe: ({ node, ...props }) => (
						<iframe
							allow={props.allow}
							allowFullScreen
							className='aspect-video w-full'
							src={props.src}></iframe>
					),
				}}
				remarkPlugins={[remarkGfm, remarkYoutube]}>
				{text}
			</ReactMarkdown>
		</TypographyStylesProvider>
	);
};

export default DisplayMarkdown;
