import { Header } from './header'
import { render, screen } from '@testing-library/react';

// next/linkのモック
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>
  }
})

describe('Header', () => {
  it('renders the header with correct title and user icon', () => {
    render(<Header />)

    // タイトルが正しく表示されているか確認
    const title = screen.getByRole('heading', { name: /衣類管理アプリ/i })
    expect(title).toBeInTheDocument()

    // タイトルがリンクになっているか確認
    const titleLink = screen.getByRole('link', { name: /衣類管理アプリ/i })
    expect(titleLink).toHaveAttribute('href', '/')

    // ユーザーアイコンボタンが存在するか確認
    const userButton = screen.getByRole('button')
    expect(userButton).toBeInTheDocument()
    expect(userButton).toHaveAccessibleName('') // アイコンボタンには通常テキストがないため

    // SVGアイコンが存在するか確認
    const userIcon = screen.getByTestId('user-icon')
    expect(userIcon).toBeInTheDocument()
  })
})