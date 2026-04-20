import { Star } from "lucide-react";
import type { ReactNode } from "react";

type RatingProps = {
	rating: number;
};
const RatingComponent = (props: RatingProps) => {
	function getStars() {
		const arr: ReactNode[] = [];
		for (let i = 1; i <= 5; i++) {
			if (i <= props.rating) {
				arr.push(<Star color="yellow" fill="yellow" key={i} size={22} />);
			} else arr.push(<Star color="black" key={i} size={22} />);
		}
		return arr;
	}

	return <div className="flex gap-1 items-center mt-2">{getStars()}</div>;
};

export default RatingComponent;
