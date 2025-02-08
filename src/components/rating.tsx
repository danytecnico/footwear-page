import { Star } from 'lucide-react'

interface StarRatingProps {
    rating: number
    max?: number
}

export function StarRating({ rating, max = 5 }: StarRatingProps) {
    return (
        <div className="flex items-center" aria-label={`Rating: ${rating} out of ${max} stars`}>
            {[...Array(max)].map((_, index) => (
                <Star
                    key={index}
                    className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                    aria-hidden="true"
                />
            ))}
        </div>
    )
}
