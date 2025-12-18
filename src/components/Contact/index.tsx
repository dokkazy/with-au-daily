import whiteHair from '@/assets/whitehair.jpg';
import RoudedButton from '../RoudedButton';

export default function Contact() {
    return (
        <section className="h-dvh w-full">
            <div className="absolute h-full w-full">
                <img className="h-full w-full object-cover" src={whiteHair} alt="Learn More Img" />
                <div className="absolute top-1/2 left-1/2 flex max-w-150 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center space-y-6 text-black">
                    <h2 className="font-bodoni flex scroll-m-20 flex-col justify-center pb-2 text-left text-7xl font-semibold tracking-tight first:mt-0">
                        <span>STUDY</span> <span>AND BEAUTY 𝜗ৎ</span>
                    </h2>
                    <p className="font-red-rose flex flex-col text-center text-xl">
                       Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt obcaecati saepe recusandae cum, facilis dolorum, aut exercitationem sed autem totam libero nam labore rem culpa. Iste vitae voluptatem iusto aperiam!
                    </p>
                    <RoudedButton backgroundColor="#A41A30">
                        <p>Mindset vibes</p>
                    </RoudedButton>
                </div>
            </div>
        </section>
    );
}
