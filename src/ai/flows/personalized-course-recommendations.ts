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
    .describe('The academic history of the student.'),
  interests: z.string().describe('The interests of the student.'),
});
export type PersonalizedCourseRecommendationsInput =
  z.infer<typeof PersonalizedCourseRecommendationsInputSchema>;

const PersonalizedCourseRecommendationsOutputSchema = z.object({
  courseRecommendations:
    z.array(z.string()).describe('A list of personalized course recommendations.'),
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
  prompt: `You are an expert academic advisor specializing in recommending courses to students based on their academic history and interests.

  You will use this information to recommend a list of courses that the student should take.

  Academic History: {{{academicHistory}}}
  Interests: {{{interests}}}

  Please provide a list of course recommendations.`,
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
