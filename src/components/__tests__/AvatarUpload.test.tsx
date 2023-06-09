import renderer from 'react-test-renderer';
import { AvatarUpload } from '../AvatarUpload';
import { render, fireEvent, waitFor } from '@testing-library/react';

describe('AvatarUpload', () => {
  let file: File;

  beforeEach(() => {
    file = new File(["(⁠^⁠.⁠_⁠.⁠^⁠)⁠ﾉ"], "cat.png", { type: "image/png" });
  });

  it('match snapshot', () => {
    const avatarUploader = renderer.create(<AvatarUpload />).toJSON();
    expect(avatarUploader).toMatchSnapshot();
  });

  it('renders correct text', () => {
    const { getByText } = render(<AvatarUpload />);

    const logoEl = getByText(/Organization Logo/i);
    expect(logoEl).toBeInTheDocument();

    const dropImageEl = getByText(/Drop the image here or click to browse/i);
    expect(dropImageEl).toBeInTheDocument();
  });

  it('uploads a file', async () => {
    const { getByTestId } = render(<AvatarUpload />);
    let fileInputEl = getByTestId("file-input");

    await waitFor(() =>
      fireEvent.change(fileInputEl, {
        target: { files: [file] },
      })
    );

    fileInputEl = getByTestId("file-input");
    // @ts-ignore
    expect(fileInputEl?.files?.[0].name).toBe("cat.png");
    // @ts-ignore
    expect(fileInputEl?.files?.length).toBe(1);
  })
})

