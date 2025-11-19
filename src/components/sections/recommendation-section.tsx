
"use client";

import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useUser, useFirestore } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';

const feedbackSchema = z.object({
  name: z.string().min(2, 'Please enter your name.'),
  likes: z.string().min(10, 'Please provide more details (at least 10 characters).'),
  improvements: z.string().min(10, 'Please tell us more (at least 10 characters).'),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

const RecommendationSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: '',
      likes: '',
      improvements: '',
    },
  });

  useEffect(() => {
    if (user?.displayName) {
      form.setValue('name', user.displayName);
    }
  }, [user, form]);

  const onSubmit: SubmitHandler<FeedbackFormValues> = async (data) => {
    if (!user || !firestore) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must be logged in to submit feedback.",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const feedbackRef = doc(firestore, 'Feedback', user.uid);
      
      const feedbackData = {
        ...data,
        userId: user.uid,
        email: user.email,
        submittedAt: new Date(),
      };

      await setDoc(feedbackRef, feedbackData, { merge: true });

      toast({
        title: "Thanks for the feedback!",
        description: "We appreciate you helping us improve LearNova.",
      });
      form.reset({ name: user.displayName || '', likes: '', improvements: '' });

    } catch (error) {
       toast({
        variant: "destructive",
        title: "Error Submitting Feedback",
        description: "There was a problem saving your feedback. Please try again later.",
      });
      console.error("Error saving feedback:", error);
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="likes"
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
                    name="improvements"
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
        </div>
      </div>
    </section>
  );
};

export default RecommendationSection;
