"use client";

import { useState, type FormEvent } from "react";
import type { Review } from "@/types";

interface ReviewsProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="w-[300px] sm:w-[340px] shrink-0 bg-surface-container-lowest p-6 rounded-2xl shadow-soft border border-surface-variant">
      <div className="flex text-secondary-container mb-4">
        {Array.from({ length: 5 }).map((_, idx) => {
          const filled = idx < Math.floor(review.rating);
          const half = !filled && idx === Math.floor(review.rating) && review.rating % 1 !== 0;
          return (
            <span
              key={idx}
              className="material-symbols-outlined select-none text-[20px]"
              style={{ fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0" }}
            >
              {half ? "star_half" : "star"}
            </span>
          );
        })}
      </div>

      <p className="font-body-md text-body-md text-on-surface-variant italic mb-6 leading-relaxed font-sans line-clamp-4">
        &ldquo;{review.comment}&rdquo;
      </p>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-red-700 text-white rounded-full flex items-center justify-center font-label-md font-sans text-xs">
          {review.initials}
        </div>
        <span className="font-label-md text-label-md text-on-surface font-sans font-semibold">
          {review.name}
        </span>
      </div>
    </article>
  );
}

export function ReviewsSection({ reviews, onAddReview }: ReviewsProps) {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    // Derive avatar initials
    const split = name.trim().split(" ");
    let initials = split[0][0].toUpperCase();
    if (split.length > 1) {
      initials += split[split.length - 1][0].toUpperCase();
    } else {
      initials += name.trim().slice(1, 2).toUpperCase();
    }

    const newReview: Review = {
      id: `REVIEW-${Date.now()}`,
      name: name.trim(),
      initials,
      rating,
      comment: comment.trim(),
    };

    onAddReview(newReview);

    // Reset fields
    setName("");
    setComment("");
    setRating(5);
    setShowForm(false);
  };

  return (
    <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto space-y-12" id="reviews-section">
      
      {/* Title Grid */}
      <div className="flex flex-col md:flex-row items-center md:justify-between text-center md:text-left gap-4">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface">O Que Dizem Nossos Clientes</h2>
          <p className="text-sm text-on-surface-variant font-sans mt-1">
            Opiniões sinceras de quem já provou nossa paixão em fatias
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-on-primary font-semibold font-label-md text-xs px-5 py-3 rounded-xl cursor-pointer hover:bg-surface-tint transition-all active:scale-95 flex items-center gap-1 shadow-sm"
          id="btn-toggle-review-form"
        >
          <span className="material-symbols-outlined text-[16px]">rate_review</span>
          {showForm ? "Fechar Formulário" : "Deixar Avaliação"}
        </button>
      </div>

      {/* Review input Form if open */}
      {showForm && (
        <form 
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto p-6 bg-surface-container-lowest rounded-3xl border border-outline-variant/50 shadow-soft space-y-4 animate-scale-up font-sans"
          id="review-form"
        >
          <h4 className="font-bold text-sm text-center border-b pb-2 uppercase tracking-wider text-primary">
            Sua Opinião é Importante!
          </h4>
          
          <div className="flex justify-center gap-2 py-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="text-secondary-container hover:scale-110 active:scale-90 transition-transform cursor-pointer"
                title={`${star} Estrelas`}
              >
                <span 
                  className="material-symbols-outlined text-[32px]"
                  style={{ fontVariationSettings: star <= rating ? "'FILL' 1" : "'FILL' 0" }}
                >
                  star
                </span>
              </button>
            ))}
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-on-surface-variant">Seu Nome</label>
            <input
              type="text"
              required
              placeholder="Ex: Mariana R."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-outline/30 rounded-xl bg-surface-container-lowest text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-on-surface-variant">Deixe seu comentário</label>
            <textarea
              required
              rows={3}
              placeholder="O que achou da massa, recheio e entrega?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 border border-outline/30 rounded-xl bg-surface-container-lowest text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-surface-tint text-on-primary font-semibold text-xs py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            Publicar Avaliação
          </button>
        </form>
      )}

      {/* Carrossel contínuo da direita para a esquerda */}
      <div className="relative mt-2" id="reviews-grid">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-20 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-20 bg-gradient-to-l from-background to-transparent" />

        <div className="overflow-hidden">
          <div className="reviews-marquee-track flex gap-6 py-2">
            {[...reviews, ...reviews].map((rev, index) => (
              <ReviewCard key={`${rev.id}-${index}`} review={rev} />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
