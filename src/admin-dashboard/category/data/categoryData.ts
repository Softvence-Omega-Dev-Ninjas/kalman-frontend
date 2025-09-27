import icon1 from "@/assets/dashboard/category/icon1.png";
import icon2 from "@/assets/dashboard/category/icon2.png";
import icon3 from "@/assets/dashboard/category/icon3.png";
import icon4 from "@/assets/dashboard/category/icon4.png";

export type TCategory={
    name: string, image:string
}

export const categoryData=[
    { name: "Plumbing", image:icon1 },
    { name: "Electrical", image:icon2 },
    { name: "Carpentry" , image:icon3},
    { name: "Painting", image:icon4},
    { name: "Roofing", image:icon1},
    { name: "Flooring", image:icon2 },
]