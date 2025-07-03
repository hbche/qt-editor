/* eslint-disable @typescript-eslint/no-explicit-any */
import './content-view.scss';

interface ContentViewProps {
  jsonContent: any;
}

const ContentView = ({ jsonContent }: ContentViewProps) => {
  const className = 'contentView';

  return (
    <div className={className}>
      <pre>
        <code>{JSON.stringify(jsonContent, null, 4)}</code>
      </pre>
    </div>
  );
};

export default ContentView;
