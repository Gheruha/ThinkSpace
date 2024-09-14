import { render } from '@testing-library/react';
import Product from '@/app/product/page';

it('should load Product page', () => {
	const { container } = render(<Product />);
	expect(container).toMatchSnapshot();
});
