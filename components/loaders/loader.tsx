type Props = {
  background?: string;
};

export default function Loader(props: Props) {
  const { background = 'bg-white' } = props;
  return (
    <div className='inline-block relative w-20 h-20'>
      <div
        className={`inline-block absolute left-2 w-4 animate-loader1 delay-[-0.24s] ${background}`}
      ></div>
      <div
        className={`inline-block absolute left-8 w-4 animate-loader1 delay-[-0.12s] ${background}`}
      ></div>
      <div
        className={`inline-block absolute left-14 delay-0 w-4 animate-loader1 ${background}`}
      ></div>
    </div>
  );
}
