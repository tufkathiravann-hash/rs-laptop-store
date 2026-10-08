import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, MessageSquare, Plus, Check } from 'lucide-react';
import { LaptopReview } from '../../types/product';
import { SAMPLE_REVIEWS } from '../../data/reviews';
import { useToast } from '../../context/ToastContext';
import { SafeImage, DEFAULT_AVATAR_FALLBACK, getAssetUrl } from '../common/SafeImage';

interface ReviewSectionProps {

  laptopId: string;
  rating: number;
  reviewCount: number;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ laptopId, rating, reviewCount }) => {
  const { showToast } = useToast();
  const [reviews, setReviews] = useState<LaptopReview[]>(() => SAMPLE_REVIEWS.default);
  const [isWriting, setIsWriting] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [helpfulVoted, setHelpfulVoted] = useState<Record<string, boolean>>({});

  const handleVoteHelpful = (id: string) => {
    if (helpfulVoted[id]) return;
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
    setHelpfulVoted((prev) => ({ ...prev, [id]: true }));
    showToast('Feedback Received', 'Thank you for voting this review helpful.', 'info');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newTitle.trim() || !newComment.trim()) {
      showToast('Missing Fields', 'Please complete all fields to submit your review.', 'warning');
      return;
    }

    const reviewObj: LaptopReview = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      avatar: getAssetUrl('/images/avatars/avatar-user.jpg'),
      rating: newRating,

      date: 'Just now',
      title: newTitle,
      comment: newComment,
      verifiedPurchase: true,
      helpfulCount: 0
    };

    setReviews([reviewObj, ...reviews]);
    setIsWriting(false);
    setNewAuthor('');
    setNewTitle('');
    setNewComment('');
    showToast('Review Published', 'Your verified customer review has been added.', 'success');
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-titanium-900/60 border border-white/5 space-y-8">
      {/* Header Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-white/5 items-center">
        {/* Score & Star pill */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2">
          <div className="text-5xl font-extrabold text-white font-mono">{rating}</div>
          <div className="flex items-center gap-1 text-amber-400">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <span className="text-xs text-slate-400">
            Based on {reviewCount} verified hardware owner reviews
          </span>
        </div>

        {/* Rating Breakdown Bars */}
        <div className="space-y-2">
          {[
            { star: 5, pct: 88 },
            { star: 4, pct: 9 },
            { star: 3, pct: 2 },
            { star: 2, pct: 1 },
            { star: 1, pct: 0 }
          ].map((row) => (
            <div key={row.star} className="flex items-center gap-3 text-xs">
              <span className="w-10 text-slate-400 font-mono flex items-center gap-1">
                <span>{row.star}</span> <Star className="w-3 h-3 fill-current text-amber-400" />
              </span>
              <div className="flex-1 h-2 bg-titanium-950 rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                  style={{ width: `${row.pct}%` }}
                />
              </div>
              <span className="w-8 text-right font-mono text-slate-500">{row.pct}%</span>
            </div>
          ))}
        </div>

        {/* Write a Review Button */}
        <div className="flex flex-col items-center md:items-end justify-center">
          <button
            onClick={() => setIsWriting(!isWriting)}
            className="px-5 py-3 rounded-xl bg-cyber-cyan hover:bg-cyan-300 text-titanium-950 font-bold text-xs flex items-center gap-2 shadow-neon-cyan/40 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>{isWriting ? 'Cancel Review' : 'Write Verified Review'}</span>
          </button>
        </div>
      </div>

      {/* Review Form */}
      {isWriting && (
        <form
          onSubmit={handleAddReview}
          className="p-5 rounded-2xl bg-titanium-950 border border-cyber-cyan/30 space-y-4 animate-in fade-in"
        >
          <h4 className="text-sm font-semibold text-white">Share Your Hardware Experience</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-300 mb-1">Your Name / Handle</label>
              <input
                type="text"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                placeholder="e.g. David Kim, 3D Animator"
                className="w-full bg-titanium-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">Your Rating</label>
              <div className="flex items-center gap-2 py-1.5">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setNewRating(val)}
                    className="p-1 text-slate-500 hover:text-amber-400 transition-colors"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        val <= newRating ? 'text-amber-400 fill-current' : 'text-slate-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1">Headline Summary</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Blown away by render times and thermal silence"
              className="w-full bg-titanium-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1">Detailed Review</label>
            <textarea
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your feedback regarding keyboard tactility, display color accuracy, battery endurance..."
              className="w-full bg-titanium-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-cyber-cyan text-titanium-950 font-bold text-xs shadow-neon-cyan transition-all"
          >
            Post Review
          </button>
        </form>
      )}

      {/* Review List */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-5 rounded-2xl bg-titanium-950/60 border border-white/5 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <SafeImage
                  src={rev.avatar}
                  alt={rev.author}
                  fallbackSrc={DEFAULT_AVATAR_FALLBACK}
                  className="w-9 h-9 rounded-full object-cover border border-white/10"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{rev.author}</span>
                    {rev.verifiedPurchase && (
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-0.5">
                        <CheckCircle className="w-3 h-3" />
                        Verified Hardware Owner
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{rev.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-0.5 text-amber-400">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-xs sm:text-sm font-semibold text-white">{rev.title}</h5>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{rev.comment}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-slate-500">
              <button
                onClick={() => handleVoteHelpful(rev.id)}
                disabled={helpfulVoted[rev.id]}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-colors ${
                  helpfulVoted[rev.id]
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-white/5 border-white/5 hover:border-white/20 text-slate-400 hover:text-white'
                }`}
              >
                <ThumbsUp className="w-3 h-3" />
                <span>Helpful ({rev.helpfulCount})</span>
              </button>
              <span className="text-[11px] font-mono text-slate-600">RS Verified Purchase</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
