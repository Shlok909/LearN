
"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { personalizedCourseRecommendations } from '@/ai/flows/personalized-course-recommendations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const feedbackSchema = z.object({
  academicHistory: z.string().min(10, 'Please provide more details (at least 10 characters).'),
  interests: z.string().min(10, 'Please tell us more (at least 10 characters).'),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

const RecommendationSection = () => {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      academicHistory: '',
      interests: '',
    },
  });

  const onSubmit: SubmitHandler<FeedbackFormValues> = async (data) => {
    setIsLoading(true);
    setRecommendations([]);
    try {
      const result = await personalizedCourseRecommendations(data);
      if (result && result.courseRecommendations) {
        setRecommendations(result.courseRecommendations);
        toast({
          title: "Feedback Received!",
          description: "Thank you for your valuable input.",
        });
      } else {
         toast({
          variant: "destructive",
          title: "An unexpected error occurred",
          description: "Could not submit feedback. Please try again.",
        });
      }
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Error Submitting Feedback",
        description: "There was a problem communicating with the AI. Please try again later.",
      });
      console.error("Error getting recommendations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="recommendations" className="py-12 md:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Give us your feedback
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-primary" />
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Let us know what you think. Your feedback helps us improve LearNova.
          </p>
        </div>

        <div className="mx-auto grid max-w-xl grid-cols-1 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Share Your Thoughts</CardTitle>
              <CardDescription>The more details you provide, the better we can understand your needs.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="academicHistory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What do you like about LearNova?</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., The interface is clean and easy to navigate..." {...field} rows={4} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="interests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What can we improve?</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., I would love to see more courses on..." {...field} rows={4} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                    ) : (
                      'Submit Feedback'
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {recommendations.length > 0 && (
             <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    AI-Generated Response
                  </CardTitle>
                  <CardDescription>Here is a summary of your feedback.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="w-full list-inside list-disc space-y-2 text-foreground">
                    {recommendations.map((rec, index) => (
                      <li key={index} className="rounded-md bg-background p-3 text-sm md:text-base">{rec}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default RecommendationSection;
