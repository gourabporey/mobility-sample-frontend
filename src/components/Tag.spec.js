import React from 'react';
import { render, screen } from '@testing-library/react';
import Tag from './Tag';

describe('Tag', () => {
  it('should display the text when provided', () => {
    const TEXT = 'Sample text';
    render(<Tag>{TEXT}</Tag>);
    expect(screen.getByText(TEXT)).toBeInTheDocument();
  });
  it('should be able to display all the children as provided', () => {
    const headerContent = 'This is a header';
    const bodyContent = 'Some content';
    const header = <h1>{headerContent}</h1>;
    const body = <p>{bodyContent}</p>;

    render(
      <Tag>
        {header}
        {body}
      </Tag>,
    );
    expect(screen.getByText(headerContent)).toBeInTheDocument();
    expect(screen.getByText(bodyContent)).toBeInTheDocument();
  });
});
