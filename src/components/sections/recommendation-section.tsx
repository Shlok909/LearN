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

const recommendationSchema = z.object({
  academicHistory: z.string().min(20, 'Please provide more details about your academic history (at least 20 characters).'),
  interests: z.string().min(10, 'Please tell us more about your interests (at least 10 characters).'),
});

type RecommendationFormValues = z.infer<typeof recommendationSchema>;

const RecommendationSection = () => {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<RecommendationFormValues>({
    resolver: zodResolver(recommendationSchema),
    defaultValues: {
      academicHistory: '',
      interests: '',
    },
  });

  const onSubmit: SubmitHandler<RecommendationFormValues> = async (data) => {
    setIsLoading(true);
    setRecommendations([]);
    try {
      const result = await personalizedCourseRecommendations(data);
      if (result && result.courseRecommendations) {
        setRecommendations(result.courseRecommendations);
      } else {
         toast({
          variant: "destructive",
          title: "An unexpected error occurred",
          description: "Could not get recommendations. Please try again.",
        });
      }
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Error Getting Recommendations",
        description: "There was a problem communicating with the AI. Please try again later.",
      });
      console.error("Error getting recommendations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="recommendations" className="bg-background py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Get Personalized Recommendations
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-primary" />
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Let our AI assistant suggest the perfect courses for you based on your background and passions.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Tell Us About Yourself</CardTitle>
              <CardDescription>The more details you provide, the better the recommendations.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="academicHistory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Academic History</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., Completed high school with a focus on science. Enjoyed math but struggled with history..." {...field} rows={4} />
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
                        <FormLabel>Your Interests</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., I love coding, building websites, and gaming. I'm also interested in AI and machine learning." {...field} rows={4} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                    ) : (
                      'Get Recommendations'
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <Card className="flex flex-col bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Your Custom Course List
              </CardTitle>
              <CardDescription>Courses tailored just for you will appear here.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-grow items-center justify-center">
              {isLoading && <Loader2 className="h-8 w-8 animate-spin text-primary" />}
              {!isLoading && recommendations.length === 0 && (
                <p className="text-center text-muted-foreground">Your recommended courses will be shown here.</p>
              )}
              {!isLoading && recommendations.length > 0 && (
                <ul className="w-full list-inside list-disc space-y-2 text-foreground">
                  {recommendations.map((rec, index) => (
                    <li key={index} className="rounded-md bg-background p-3">{rec}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RecommendationSection;
