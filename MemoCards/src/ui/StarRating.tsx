import { ComponentPropsWithoutRef, useState } from 'react'
import { CiStar } from 'react-icons/ci'
import { TiStarFullOutline } from 'react-icons/ti'

const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
}

const starContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    // gap: '4px',
}

type StarRatingTypes = {
    maxRating: number
    defaultRating: number
    color: string
    size: number
    messages?: string[]
    className?: string
    onSetRating: (rating: number) => void
    rated?: boolean
} & ComponentPropsWithoutRef<'div'>

function StarRating({
    maxRating = 5,
    color = '#fcc419',
    size = 48,
    className = '',
    messages = [],
    defaultRating = 0,
    onSetRating,
    rated = false,
    ...props
}: StarRatingTypes) {
    const defaultRatingStars = defaultRating === -1 ? 0 : defaultRating
    const [rating, setRating] = useState<number>(defaultRatingStars)
    const [tempRating, setTempRating] = useState<number>(0)
    function handleRating(rating: number) {
        setRating(rating)
        onSetRating(rating)
    }

    const textStyle = {
        lineHeight: '1',
        margin: '0',
        color,
        fontSize: `${size / 1.5}px`,
    }

    return (
        <div style={containerStyle} className={className} {...props}>
            <div style={starContainerStyle}>
                {Array.from({ length: maxRating }, (_, i) => (
                    <Star
                        key={i}
                        onRate={() => handleRating(i + 1)}
                        onHoverIn={() => setTempRating(i + 1)}
                        onHoverOut={() => setTempRating(0)}
                        full={
                            tempRating ? tempRating >= i + 1 : rating >= i + 1
                        }
                        color={color}
                        size={size}
                    ></Star>
                ))}
            </div>
            <p style={textStyle}>
                {messages.length === maxRating + 1
                    ? messages[tempRating ? tempRating : rating]
                    : tempRating || rating || '0'}
            </p>
        </div>
    )
}

type StarTypes = {
    onRate: () => void
    full: boolean
    onHoverIn: () => void
    onHoverOut: () => void
    color: string
    size: number
}

function Star({
    onRate,
    full = false,
    onHoverIn,
    onHoverOut,
    color,
    size,
}: StarTypes) {
    const starStyle = {
        width: `${size}px`,
        height: `${size}px`,
        cursor: 'pointer',
        display: 'block',
        fill: color,
    }
    return (
        <span
            role="button"
            style={starStyle}
            onClick={onRate}
            onMouseEnter={onHoverIn}
            onMouseLeave={onHoverOut}
        >
            {full ? (
                <TiStarFullOutline style={starStyle}></TiStarFullOutline>
            ) : (
                <CiStar style={starStyle}></CiStar>
            )}
        </span>
    )
}

export default StarRating
