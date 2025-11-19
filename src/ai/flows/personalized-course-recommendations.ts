
'use server';

/**
 * @fileOverview A personalized course recommendation AI agent.
 *
 * - personalizedCourseRecommendations - A function that handles the course recommendation process.
 * - PersonalizedCourseRecommendationsInput - The input type for the personalizedCourseRecommendations function.
 * - PersonalizedCourseRecommendationsOutput - The return type for the personalizedCourseRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedCourseRecommendationsInputSchema = z.object({
  academicHistory: z
    .string()
    .describe('The first part of the user feedback or query.'),
  interests: z.string().describe('The second part of the user feedback or query.'),
});
export type PersonalizedCourseRecommendationsInput =
  z.infer<typeof PersonalizedCourseRecommendationsInputSchema>;

const PersonalizedCourseRecommendationsOutputSchema = z.object({
  courseRecommendations:
    z.array(z.string()).describe('A list of responses, recommendations, or feedback summaries.'),
});
export type PersonalizedCourseRecommendationsOutput =
  z.infer<typeof PersonalizedCourseRecommendationsOutputSchema>;

export async function personalizedCourseRecommendations(
  input: PersonalizedCourseRecommendationsInput
): Promise<PersonalizedCourseRecommendationsOutput> {
  return personalizedCourseRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedCourseRecommendationsPrompt',
  input: {schema: PersonalizedCourseRecommendationsInputSchema},
  output: {schema: PersonalizedCourseRecommendationsOutputSchema},
  prompt: `You are an expert academic advisor and user feedback analyst for a platform called LearNova.

  Your role is to analyze user input and provide a helpful response. The user might be asking for course recommendations OR providing feedback.

  - If they are asking for recommendations, use their academic history and interests to recommend a list of courses.
  - If they are providing feedback (likes and dislikes), summarize their feedback and thank them.

  User Likes / Academic History: {{{academicHistory}}}
  User Dislikes or Interests: {{{interests}}}

  Please provide a helpful response as a list of items.`,
});

const personalizedCourseRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedCourseRecommendationsFlow',
    inputSchema: PersonalizedCourseRecommendationsInputSchema,
    outputSchema: PersonalizedCourseRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
