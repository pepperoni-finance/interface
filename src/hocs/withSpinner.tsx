import { Icon } from "../constants/icons";

export function withSpinner<T extends { loading: boolean; error: boolean }>(
  WrappedComponent: React.ComponentType<T>
) {
  const ComponentWithSpinner = (props: T & { className?: string }) => {
    const { loading, error, className } = props;

    if (loading) {
      return (
        <div
          className={`${className} flex justify-end items-center text-gray-400`}
        >
          {Icon.Spinner}
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-end items-center">
          <div className="group flex hover:cursor-pointer text-red-500 hover:text-red-700 mr-[0.14rem]">
            {Icon.Warn}
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithSpinner;
}
