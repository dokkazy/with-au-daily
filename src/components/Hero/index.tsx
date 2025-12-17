import styles from "./Hero.module.scss";
import heroImg from "@/assets/cat.png";
import { ShinyButton } from "@/components/ui/shiny-button";
import CircularText from "./CircularText";

export default function Hero() {
  return (
    <div className={styles.main}>
      <div className="container">
        <img
          className="absolute h-screen w-full object-cover"
          src={heroImg}
          alt="Hero"
        />

        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center max-w-[600px] space-y-6 text-white">
          <h2 className="font-bodoni flex scroll-m-20 flex-col justify-center pb-2 text-left text-7xl font-semibold tracking-tight first:mt-0">
            <span>STUDY</span> <span>AND BEAUTY 𝜗ৎ</span>
          </h2>
          <p className="font-red-rose flex flex-col text-center text-xl">
            Không gian nhỏ để bạn get ready with your life 𝜗ৎ nơi mỗi buổi sáng
            bắt đầu bằng sự chăm sóc bản thân, và mỗi tối kết thúc bằng việc
            tiến gần hơn đến ước mơ.
          </p>
          <ShinyButton className="font-red-rose rounded-none bg-white text-black">
            Mindset vibes
          </ShinyButton>
          <CircularText
            text="WITH*AU*DAILY*"
            onHover="speedUp"
            spinDuration={20}
            className="custom-class"
          />
        </div>
      </div>
    </div>
  );
}
